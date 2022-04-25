/*
                                         ,---------,__
                                     ,--'             ',
            ,_--------,____,        /                   \
          ,/                '.     /            ,' \     \
         /                    \   /   ,______,'    \,     ',
       ,/     ,_____.-----,    \  |  /~~-_     _~~~-|      |
     _/      /             \    ',|  ).-,   -. (     |
    (       / ,---_     _---\     \  |     ;          |    ;
    /      ;,  ~-   ,~(      | |    ;_,         |   ;
    )      /|         :     |      \ |  '__.___`     ;    |
   /       \_        ._;    :      |\ \  `.___.'     /    |
  /          |    ,___.__` ,'      ; \ \.        ,'|    /
 /            \,   `.__.' /        )  \,|`------'  |__,/
(           _ / `-._____.;       /   ,- |   ___,---'   \.
 )        ,' |           /       ) ,/ ,( | / )       __.'|\.
(      _.'   |          /|\     / ,|/' \\| | |   __.'    |  \.
(    :'       \         ;\ \   /,' ;    | \) |_.'        |    \.
\     )`--__,  \        /_; |,'/ \  |   '/' /         __/ \.    \
 `-,__'      \. \.     /'  \/~`;  \  |  |  /  _______'      `-.__\
 /     \,      \. \.  /    {~{*}~} \ |  | /_-'              /   `,_
|        |       \, \/      `~;~'   \|  | |                |        `,

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
	public get $id(): number  {
		return this.id;
	}

    /**
     * Setter $id
     * @param {number } value
     */
	public set $id(value: number ) {
		this.id = value;
	}

    /**
     * Getter $firstName
     * @return {string }
     */
	public get $firstName(): string  {
		return this.firstName;
	}

    /**
     * Setter $firstName
     * @param {string } value
     */
	public set $firstName(value: string ) {
		this.firstName = value;
	}

    /**
     * Getter $lastName
     * @return {string }
     */
	public get $lastName(): string  {
		return this.lastName;
	}

    /**
     * Setter $lastName
     * @param {string } value
     */
	public set $lastName(value: string ) {
		this.lastName = value;
	}

    /**
     * Getter $email
     * @return {string }
     */
	public get $email(): string  {
		return this.email;
	}

    /**
     * Setter $email
     * @param {string } value
     */
	public set $email(value: string ) {
		this.email = value;
	}

    /**
     * Getter $password
     * @return {string }
     */
	public get $password(): string  {
		return this.password;
	}

    /**
     * Setter $password
     * @param {string } value
     */
	public set $password(value: string ) {
		this.password = value;
	}

    /**
     * Getter $birthday
     * @return {string }
     */
	public get $birthday(): string  {
		return this.birthday;
	}

    /**
     * Setter $birthday
     * @param {string } value
     */
	public set $birthday(value: string ) {
		this.birthday = value;
	}

    /**
     * Getter $sex
     * @return {string }
     */
	public get $sex(): string  {
		return this.sex;
	}

    /**
     * Setter $sex
     * @param {string } value
     */
	public set $sex(value: string ) {
		this.sex = value;
	}

    /**
     * Getter $conditions
     * @return {string }
     */
	public get $conditions(): string  {
		return this.conditions;
	}

    /**
     * Setter $conditions
     * @param {string } value
     */
	public set $conditions(value: string ) {
		this.conditions = value;
	}

    /**
     * Getter $image
     * @return {number }
     */
	public get $image(): number  {
		return this.image;
	}

    /**
     * Setter $image
     * @param {number } value
     */
	public set $image(value: number ) {
		this.image = value;
	}

}
