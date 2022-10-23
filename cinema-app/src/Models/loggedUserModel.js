export default class LoggedInUser {

    constructor(id, token, name, email, role) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.token = token;
      this.role = role;
    }

}
