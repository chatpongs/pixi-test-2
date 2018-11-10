import React, { Component } from 'react';
import { Application, Rectangle, Sprite, Texture, extras, projection } from 'pixi.js';
import 'pixi-projection';

// Note: Pixi's 3D space is: x right / y down / z inward, counter clockwise rotation
class App extends Component {
  componentDidMount() {
    this.app = new Application({ width: 800, height: 600 });
    this.container.appendChild(this.app.view);

    const sheet = Texture.fromImage('images/character.png');
    const frameWidth = 400;
    const frameHeight = 600;
    const row = 1;
    const rects = [0, 1, 2, 3].map(index =>
      new Rectangle(index * frameWidth, frameHeight * row, frameWidth, frameHeight)
    );
    const frames = rects.map(rect => new Texture(sheet, rect));
    const character = new extras.AnimatedSprite(frames);
    character.anchor.set(0.5, 0.5);
    character.scale.set(0.4, 0.4)
    character.animationSpeed = 0.2;
    character.position.set(this.app.screen.width / 2, this.app.screen.height - 150);
    character.play();

    const camera = new projection.Camera3d();
    camera.setPlanes(300, -500, 1000, false);
    camera.position.set(this.app.screen.width / 2, 0);
    camera.position3d.y = -600; // camera is above the ground
    camera.position3d.z = 0;
    
    const groundLayer = new projection.Container3d();
    groundLayer.euler.x = -Math.PI / 2;
    camera.addChild(groundLayer);

    const fg = new projection.Sprite3d(Texture.fromImage('images/character.png'));
    fg.scale.set(0.5, 0.5, 1);
    fg.anchor.set(0.5, 0.5);
    groundLayer.addChild(fg);
    
    // add objects into the scene
    this.app.stage.addChild(camera);
    this.app.stage.addChild(character);
    
    // listen to tick
    this.app.ticker.add(delta => {
      groundLayer.euler.z += 0.01;
    })
  }
  render() {
    return (
      <div ref={r => this.container = r} />
    );
  }
}

export default App;
