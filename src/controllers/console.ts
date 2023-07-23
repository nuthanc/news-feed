import input from '@inquirer/input';
import AppDb from '../repositories/store/sqlite-db';

class Console {
  async startProgram(): Promise<void> {
    console.log('Welcome to the Social Network!\n');
    this.showValidCommands();
    let quit = false;
    while (!quit) {
      const [command, ...args] = (await input({ message: 'Enter command: ' }))
        .trim()
        .split(' ');
      switch (command) {
        case 'signup':
          const [username, password] = args;
          console.log(`Username is ${username} and Password is ${password}`);
          break;
      }
    }
  }

  showValidCommands() {
    console.log(`signup [username] [password]`);
    console.log(`login [username] [password]`);
    console.log(`post [feed]`);
    console.log(`follow [username]`);
    console.log(`reply [post/comment] [postId/commentId] [replyText]`);
    console.log(`upvote [post/comment] [postId/commentId]`);
    console.log(`downvote [post/comment] [postId/commentId]\n`);
  }
}

export default Console;
