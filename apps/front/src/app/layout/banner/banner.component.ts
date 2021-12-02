import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';

@Component({
  selector: 'open-bike-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, AfterViewInit {

  @ViewChild("canvas") canvas!: ElementRef<HTMLCanvasElement>;

  engine!: BABYLON.Engine;
  scene!: BABYLON.Scene;
  camera!: BABYLON.Camera;
  light!: BABYLON.HemisphericLight;
  planet?: BABYLON.Mesh
  radius = 3
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.engine = new BABYLON.Engine(this.canvas.nativeElement);
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.autoClear = false
    this.camera = new BABYLON.FreeCamera('main', new BABYLON.Vector3(0, 5, -10), this.scene)
    this.camera.fov = 0.5
    this.camera.attachControl(true)
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), this.scene)
    // this.light.diffuse = new BABYLON.Color3(0.07, 0.15, 0.29)

    // const defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, this.scene, [this.camera]);
    // defaultPipeline.bloomEnabled = true;
    // defaultPipeline.fxaaEnabled = false;
    // defaultPipeline.bloomWeight = 1;
    // defaultPipeline.bloomScale = 0.2

    // this.planet = this.generateWorld(true)
    this.planet = this.generateWorld(true)
    this.generateBikes()

    this.engine.runRenderLoop(() => {
      this.scene?.render()
    })
  }

  generateWorld(filter?: boolean) {
    const planet = BABYLON.MeshBuilder.CreateSphere('planet', { diameter: this.radius * 2, segments: 64 }, this.scene)
    planet.position.y = 0
    planet.position.x = 4
    planet.rotation.x = Math.PI
    planet.checkCollisions = true
    planet.ellipsoid = new BABYLON.Vector3(1, 0, 1)
    const texture = new BABYLON.Texture('assets/night.jpg', this.scene)
    const material = new BABYLON.StandardMaterial('world', this.scene)
    material.diffuseTexture = texture
    // material.emissiveTexture = texture
    material.emissiveColor = new BABYLON.Color3(0.07, 0.15, 0.29)
    planet.material = material
    // material.useAlphaFromDiffuseTexture = true
    material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4)

    planet.registerBeforeRender(() => {
      planet.rotation.y += this.engine.getDeltaTime() * 0.00005
      planet.rotation.x += this.engine.getDeltaTime() * 0.00005
    })

    if(filter) {
      const gl = new BABYLON.GlowLayer("glow", this.scene, {
        mainTextureFixedSize: 1024,
        blurKernelSize: 256
      });
      gl.intensity = 1
      gl.neutralColor = new BABYLON.Color4(0.2, 0.14, 0.4, 0.01);
      gl.addIncludedOnlyMesh(planet)
    }

    return planet
  }

  generateBikes() {
    BABYLON.SceneLoader.ImportMeshAsync('', 'assets/', 'bike.glb', this.scene).then((mesh) => {
      const bike = mesh.meshes[0]

      bike.position = this.planet!.position
      bike.position = bike.position.add(new BABYLON.Vector3(0, this.radius + 3, 0))
      bike.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
      bike.checkCollisions = true
      this.scene.registerBeforeRender(() => {
        // bike.lookAt(this.planet!.position)
        // bike.rotate(new BABYLON.Vector3(-1, 0, 0), Math.PI/2, BABYLON.Space.LOCAL)
        bike.moveWithCollisions(
          new BABYLON.Vector3(
            this.planet!.position.x - bike.position.x,
            this.planet!.position.y - bike.position.y,
            this.planet!.position.z - bike.position.z,
          ).scaleInPlace(0.05)
        )
      })
      this.scene.debugLayer.show()
    })
  }

}
