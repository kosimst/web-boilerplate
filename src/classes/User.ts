export default class User {
  /**
   * Generates new user object
   * @param name Display name
   * @param email E-Mail of uder
   * @param photoUrl Url for profile picture
   */
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly photoUrl: string
  ) {
    return Object.freeze(this)
  }
}
