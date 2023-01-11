/**
 * Model for our users in the database
 * @export
 * @class User
 */
export class User {
    /**
     * Id of the user
     * @private
     * @type {number}
     * @memberof User
     */
    private id: number = -1;
    /**
     * The user's first name
     * @private
     * @type {string}
     * @memberof User
     */
    private firstName: string = "";
    /**
     * The user's last name
     * @private
     * @type {string}
     * @memberof User
     */
    private lastName: string = "";
    /**
     * The user's email
     * @private
     * @type {string}
     * @memberof User
     */
    private email: string = "";
    /**
     * The user's password
     * @private
     * @type {string}
     * @memberof User
     */
    private password: string = "";
    /**
     * The user's birthday
     * @private
     * @type {string}
     * @memberof User
     */
    private birthday: string = "";
    /**
     * The user's sex
     * @private
     * @type {string}
     * @memberof User
     */
    private sex: string = "";
    /**
     * The user's conditions
     * @private
     * @type {string}
     * @memberof User
     */
    private conditions: string = "";
    /**
     * The user's profile picture
     * @private
     * @type {number}
     * @memberof User
     */
    private image: number = 0;

    /**
     * User Constructor
     * @constructor
     * @param id Id of the user
     * @param firstName The user's first name
     * @param lastName The user's last name
     * @param email The user's email
     * @param password The user's password
     * @param birthday The user's birthday
     * @param sex The user's sex
     * @param conditions The user's pre existing conditions
     * @param image The user's profile picture
     */
    constructor(id: number,firstName: string,lastName: string,email: string,password: string,birthday: string,sex: string,conditions: string,image: number) 
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthday = birthday;
        this.sex = sex;
        this.conditions = conditions;
        this.image = image;
    }


     /**
      * Method to get the Id of the user
      *
      * @type {number}
      * @memberof User
      */
     public get Id(): number  
     {
		return this.id;
	}
     /**
      * Method to set the Id of the user
      *
      * @memberof User
      */
     public set Id(value: number ) 
     {
		this.id = value;
	}

     /**
      * Method to get the first name of the user
      *
      * @type {string}
      * @memberof User
      */
     public get FirstName(): string  
     {
		return this.firstName;
	}
     /**
      * Method to set the first name of the user
      *
      * @memberof User
      */
     public set FirstName(value: string ) 
     {
		this.firstName = value;
	}

     /**
      * Method to get the last name of the user
      *
      * @type {string}
      * @memberof User
      */
     public get LastName(): string  
     {
		return this.lastName;
	}
     /**
      * Method to set the last name of the user
      *
      * @memberof User
      */
     public set LastName(value: string ) 
     {
		this.lastName = value;
	}

     /**
      * Method to get the email of the user
      *
      * @type {string}
      * @memberof User
      */
     public get Email(): string  
     {
		return this.email;
	}
     /**
      * Method to set the email of the user
      *
      * @memberof User
      */
     public set Email(value: string ) 
     {
		this.email = value;
	}

     /**
      * Method to get the user's password
      *
      * @type {string}
      * @memberof User
      */
     public get Password(): string  
     {
		return this.password;
	}
     /**
      * Method to set the user's password
      *
      * @memberof User
      */
     public set Password(value: string) 
     {
		this.password = value;
	}

     /**
      * Method to get the user's birthday
      *
      * @type {string}
      * @memberof User
      */
     public get Birthday(): string  
     {
		return this.birthday;
	}
     /**
      * Method to set the user's birthday
      *
      * @memberof User
      */
     public set Birthday(value: string ) 
     {
		this.birthday = value;
	}

     /**
      * Method to get the user's sex
      *
      * @type {string}
      * @memberof User
      */
     public get Sex(): string  
     {
		return this.sex;
	}
     /**
      * Method to set the user's sex
      *
      * @memberof User
      */
     public set Sex(value: string ) 
     {
		this.sex = value;
	}

     /**
      * Method to get the user's pre existing conditions
      *
      * @type {string}
      * @memberof User
      */
     public get Conditions(): string  
     {
		return this.conditions;
	}
     /**
      * Method to set the user's pre existing conditions
      *
      * @memberof User
      */
     public set Conditions(value: string ) 
     {
		this.conditions = value;
	}

     /**
      * Method to get the user's profile picture
      *
      * @type {number}
      * @memberof User
      */
     public get Image(): number  
     {
		return this.image;
	}

     /**
      * Method to set the user's profile picture
      *
      * @memberof User
      */
     public set Image(value: number ) 
     {
		this.image = value;
	}

}
