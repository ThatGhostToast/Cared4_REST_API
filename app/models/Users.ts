/*
Model for our users in the database
*/

export class User {
  private id: number = -1;
  private firstName: string = "";
  private lastName: string = "";
  private email: string = "";
  private password: string = "";
  private birthday: string = "";
  private sex: string = "";
  private conditions: string = "";
  private image: number = 0;

  constructor(id: number,firstName: string,lastName: string,email: string,password: string,birthday: string,sex: string,conditions: string,image: number) {
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
     * Getter $id
     * @return {number }
     */
	public get Id(): number  {
		return this.id;
	}

    /**
     * Setter $id
     * @param {number } value
     */
	public set Id(value: number ) {
		this.id = value;
	}

    /**
     * Getter $firstName
     * @return {string }
     */
	public get FirstName(): string  {
		return this.firstName;
	}

    /**
     * Setter $firstName
     * @param {string } value
     */
	public set FirstName(value: string ) {
		this.firstName = value;
	}

    /**
     * Getter $lastName
     * @return {string }
     */
	public get LastName(): string  {
		return this.lastName;
	}

    /**
     * Setter $lastName
     * @param {string } value
     */
	public set LastName(value: string ) {
		this.lastName = value;
	}

    /**
     * Getter $email
     * @return {string }
     */
	public get Email(): string  {
		return this.email;
	}

    /**
     * Setter $email
     * @param {string } value
     */
	public set Email(value: string ) {
		this.email = value;
	}

    /**
     * Getter $password
     * @return {string }
     */
	public get Password(): string  {
		return this.password;
	}

    /**
     * Setter $password
     * @param {string } value
     */
	public set Password(value: string ) {
		this.password = value;
	}

    /**
     * Getter $birthday
     * @return {string }
     */
	public get Birthday(): string  {
		return this.birthday;
	}

    /**
     * Setter $birthday
     * @param {string } value
     */
	public set Birthday(value: string ) {
		this.birthday = value;
	}

    /**
     * Getter $sex
     * @return {string }
     */
	public get Sex(): string  {
		return this.sex;
	}

    /**
     * Setter $sex
     * @param {string } value
     */
	public set Sex(value: string ) {
		this.sex = value;
	}

    /**
     * Getter $conditions
     * @return {string }
     */
	public get Conditions(): string  {
		return this.conditions;
	}

    /**
     * Setter $conditions
     * @param {string } value
     */
	public set Conditions(value: string ) {
		this.conditions = value;
	}

    /**
     * Getter $image
     * @return {number }
     */
	public get Image(): number  {
		return this.image;
	}

    /**
     * Setter $image
     * @param {number } value
     */
	public set Image(value: number ) {
		this.image = value;
	}

}
