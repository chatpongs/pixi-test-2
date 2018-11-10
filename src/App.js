import React, { Component } from 'react';
import { Application, Rectangle, Sprite, Texture, extras } from 'pixi.js';

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
    this.app.stage.addChild(character);
  }
  render() {
    return (
      <div ref={r => this.container = r} />
    );
  }
}

export default App;
