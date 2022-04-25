export class Juice 
{
    private id: number = -1;
    private name: string = "";
    private ingredients: string = "";
    private benefits: string = "";
    private htm: string = "";
    private imageName: string = "";
 
    constructor(id:number, name:string, ingredients:string, benefits:string, htm:string, imagename:string)
    {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.benefits = benefits;
        this.htm = htm;
        this.imageName = imagename;
    }

    get Id():number
    {
        return this.id;
    }
    set Id(id:number)
    {
        this.id = id;
    }

    get Name():string
    {
        return this.name;
    }
    set Name(name:string)
    {
        this.name = name;
    }

    get Ingredients():string
    {
        return this.ingredients;
    }
    set Ingredients(ingredients:string)
    {
        this.ingredients = ingredients;
    }

    get Benefits():string
    {
        return this.benefits;
    }
    set Benefits(benefits:string)
    {
        this.benefits = benefits;
    }

    public get Htm(): string 
    {
        return this.htm;
    }

    public set Htm(htm: string) 
    {
        this.htm = htm;
    }

    public get ImageName(): string
    {
        return this.imageName;
    }

    public set ImageName(imagename:string)
    {
        this.imageName = imagename;
    }
}