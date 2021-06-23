import * as rimraf from "rimraf";
import { execSync, ExecSyncOptions } from "child_process";

const projectName = "the-project";

const version = execSync('ionic --version').toString().trim();
const branch = version;
console.log("generating", branch);

execSync(`git checkout -b ${branch}`);

rimraf.sync(projectName);

runAndCommit(`ionic start ${projectName} blank --type=angular --capacitor --no-deps`);

function runAndCommit(command: string, options?: ExecSyncOptions) {
  console.log('Running command:', command);
  execSync(command, options);
  execSync("git add .");
  execSync(`git commit -m "${command}"`);
}
