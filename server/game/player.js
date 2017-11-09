class Player {
  constructor(socket, name) {
    this.socket = socket;
    this.name = name;

    // default values
    this.resetAll();
  }

  resetAll() {
    this.resetStatuses();
    this.resetHand();
  }

  resetStatuses() {
    this.isReady = false;
    this.hasChanged = false;
    this.isActive = false;
  }

  resetHand() {
    this.hand = [];
  }
}

module.exports = Player;
