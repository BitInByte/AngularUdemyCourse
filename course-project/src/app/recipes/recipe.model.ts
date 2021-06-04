export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;

  // Will be executed once we create a new instance of this class
  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
  }
}
