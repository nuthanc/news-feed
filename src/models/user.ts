class User {
  constructor(
    private id: number,
    private sessionId: number,
    private name: string
  ) {}

  login(): void {}
  postFeed(): void {}
  followUser(): void {}
  showNewsFeed(): void {}

  getId() {
    return this.id;
  }

  getSessionId() {
    return this.sessionId;
  }

  getName() {
    return this.name;
  }
}

export default User;
