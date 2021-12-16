import { AuthService } from './../../auth/auth.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as BABYLON from 'babylonjs';
import 'babylonjs-loaders';
import { BehaviorSubject } from 'rxjs';
import { ManageUserDto } from '@open-bike/lib';

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
  radius = 8
  $user: BehaviorSubject<ManageUserDto | null>
  constructor(private authService: AuthService) { 
    this.$user = this.authService.user
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
    this.engine = new BABYLON.Engine(this.canvas.nativeElement);
    this.scene = new BABYLON.Scene(this.engine);
    this.scene.autoClear = false
    this.camera = new BABYLON.FreeCamera('main', new BABYLON.Vector3(0, 5, -10), this.scene)
    this.camera.fov = 0.4
    this.camera.attachControl(true)
    this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(1, 1, 0), this.scene)

    this.planet = this.generateWorld(true)
    this.generateBike()
    this.generateParticles()

    this.engine.runRenderLoop(() => {
      this.scene?.render()
    })
  }

  generateWorld(filter?: boolean) {
    const planet = BABYLON.MeshBuilder.CreateSphere('planet', { diameter: this.radius * 2, segments: 64 }, this.scene)
    planet.position.y = 0
    planet.position.x = 4
    planet.rotation.x = Math.PI
    const texture = new BABYLON.Texture('assets/night.jpg', this.scene)
    const material = new BABYLON.StandardMaterial('world', this.scene)
    material.diffuseTexture = texture
    // material.emissiveTexture = texture
    material.emissiveColor = new BABYLON.Color3(0.036, 0.15, 0.29)
    planet.material = material
    material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4)

    planet.registerBeforeRender(() => {
      planet.rotation.y += this.engine.getDeltaTime() * 0.00003
      planet.rotation.x += this.engine.getDeltaTime() * 0.00003
    })

    if (filter) {
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

  generateBike() {
    BABYLON.SceneLoader.ImportMeshAsync('', 'assets/', 'bike.glb', this.scene).then((mesh) => {
      const bike = mesh.meshes[0]

      bike.position = this.camera.position.add(new BABYLON.Vector3(
        0, 0, 3
      ))
      bike.rotate(new BABYLON.Vector3(1, 1, 0), Math.PI / 3, BABYLON.Space.LOCAL)
      // bike.
      // bike.position = bike.position.add(new BABYLON.Vector3(0, this.radius + 3, -2))
      bike.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3)
      this.scene.registerBeforeRender(() => {
        const dt = this.engine.getDeltaTime() / 100

        bike.rotate(new BABYLON.Vector3(1, 1, 0), 0.01 * dt)
        bike.position = bike.position.add(new BABYLON.Vector3(0.002 * dt, 0.0003 * dt, 0.0001 * dt))
      })
    })
  }

  generateParticles() {

    //Sphere around emitter
    const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.01, segments: 8 }, this.scene);
    sphere.material = new BABYLON.StandardMaterial("mat", this.scene);
    sphere.material.wireframe = true;

    // Create a particle system
    const particleSystem = new BABYLON.ParticleSystem("particles", 2000, this.scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("assets/flare.png", this.scene);

    // Where the particles come from
    particleSystem.emitter = BABYLON.Vector3.Zero(); // the starting location

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.01;
    particleSystem.maxSize = 0.2;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;

    // Emission rate
    particleSystem.emitRate = 75;


    /******* Emission Space ********/
    particleSystem.createBoxEmitter(new BABYLON.Vector3(-10, 10, 10),
      new BABYLON.Vector3(-10, 10, 10),
      new BABYLON.Vector3(-1, -20, -2.5),
      new BABYLON.Vector3(1, 20, 2.5));

    // Speed
    particleSystem.minEmitPower = 0.1;
    particleSystem.maxEmitPower = 1;
    particleSystem.updateSpeed = 0.005;

    // Start the particle system
    particleSystem.start();
  }
}
