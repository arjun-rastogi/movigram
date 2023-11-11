// Log Service for handling errors.

function init(): void {}

function log(error: any): void {
  console.error(error);
}

export default {
  init,
  log,
};
