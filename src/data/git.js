import { p, h, ul, ol, table, code, plain, tip, trimCode } from './blocks.js'

const theory = [
  {
    id: 'git-why',
    title: 'Why version control?',
    from: '4 – git & GitHub',
    blocks: [
      p("Without version control you end up with one of two bad situations:"),
      ul([
        "**Many versions in different files**: report_final.docx, report_final2.docx, report_REALLY_final.docx ...",
        "**Overwriting the same file with no history**: the old version is gone forever.",
      ]),
      h('A Git repository tracks project changes'),
      ul([
        "Git was created by **Linus Torvalds in 2005** to manage the development of the **Linux kernel**.",
        "A Git repository is a **`.git/` folder** inside a project folder.",
        "It **tracks all changes** made to files, building a **history** over time.",
      ]),
      p("Your **GitHub profile also works as a portfolio**: employers can see your projects and your commits."),
      plain("Version control = a time machine for your project. You can see who changed what and when, and go back to any saved version."),
    ],
  },
  {
    id: 'git-local',
    title: 'Local workflow: init, status, add, commit',
    from: '4 – git & GitHub',
    blocks: [
      h('Installation and initialization'),
      ul([
        "Ubuntu: `sudo apt install git`",
        "Mac: through Xcode or Homebrew",
        "Windows: Git SCM (git-scm.com)",
      ]),
      code(`
$ mkdir mynewproject   # create a new folder for the project
$ cd mynewproject      # go into the project folder
$ git init             # now the folder is a Git repository`),

      h('The sections (areas) of a Git project'),
      table(
        ['Area', 'What it is'],
        [
          ['Working Directory', 'where you edit files'],
          ['Staging Area', 'where you prepare changes for the next commit'],
          ['Local Repository', 'the code that has been committed (stored in .git/)'],
          ['Remote Repository', 'the remote server (e.g. GitHub) for sharing and collaboration'],
        ],
      ),
      p("A file in the working directory can be **unmodified, modified or staged**. The staging area records the staged changes. The Git directory stores the committed **snapshots**."),

      h('git status'),
      p("`git status` shows the **state of the working directory and the staging area**: which files are modified, which are staged, which are untracked. It also tells you which branch you are on."),

      h('git add'),
      p("`git add` moves a file (its current changes) **to the staging area**. `git add .` stages all files in the folder."),

      h('git commit'),
      ul([
        "`git commit -m \"My custom message\"` saves a **snapshot of all staged changes** to the **local repository**. The file is now tracked and this version is kept.",
        "The message helps you identify this specific version later.",
        "`git log` or `git log --oneline` shows the **commit history**. Each commit has a **unique identifier (SHA-1 hash)**.",
      ]),
      tip("\"Save the changes permanently to your local repository\" = `git commit`. `git add` only stages; `git push` sends to the remote."),

      h('Commit naming convention'),
      p("Good commit messages describe **what** changed and **why**. As a project drags on, messages often get less informative (\"more code\", \"asdfgh\") – avoid that. A common convention (Commitizen / conventional commits) starts the message with a type:"),
      table(
        ['Type', 'Use for'],
        [
          ['feat', 'a new feature'],
          ['fix', 'a bug fix'],
          ['docs', 'documentation only changes'],
          ['style', 'changes that do not affect the meaning of the code (white-space, formatting, missing semicolons, ...)'],
          ['refactor', 'a code change that neither fixes a bug nor adds a feature'],
          ['perf', 'a code change that improves performance'],
          ['test', 'adding missing tests'],
          ['chore', 'changes to the build process or tools / libraries'],
        ],
      ),
      code(`
$ git commit -m "feat: add like button to posts"
$ git commit -m "fix: like count did not update after delete"
$ git commit -m "chore: ignore node_modules"`),

      h('Excluding files: .gitignore'),
      ul([
        "By default `git add .` stages **all** files – including ones you may not want tracked (passwords, logs, keys).",
        "To keep files from being tracked (and maybe published later), list them in a **`.gitignore`** file.",
        "**Once a file is already tracked, .gitignore alone won't help** – you must untrack it manually (`git rm --cached`).",
      ]),
      code(`
*.pem
*.log
passwords.txt
node_modules/`, 'Example .gitignore'),

      h('Workflow recap: add → commit'),
      code(`
$ git init                      # initialize the project
# create .gitignore for files you don't want to track
# create and work on your files
$ git add .                     # stage all files ("freeze" a version)
$ git commit -m "First version" # commit the staged files with a name`),
      p("User interfaces for Git: the **CLI** (command line), **VS Code Git integration** and **GitHub Desktop**."),
    ],
  },
  {
    id: 'git-remote',
    title: 'Git vs. GitHub and remote repositories',
    from: '4 – git & GitHub',
    blocks: [
      h('Git and the platforms'),
      ul([
        "**git** – the version control tool, runs **locally** on your computer.",
        "**GitHub** – a **cloud-based platform** for **hosting** repositories and **collaboration**.",
        "Other platforms: GitLab, Bitbucket, Codeberg.",
      ]),
      tip("Git runs locally on your computer, GitHub hosts repositories online. GitHub is not required for Git to work, and it does not sync anything automatically."),

      h('Configuring your account locally'),
      code(`
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"`),
      p("These values are used as the author of your commits. Priority of the settings:"),
      ol([
        "`--local` (project specific) – local overrides global inside that folder",
        "`--global` (user specific)",
        "`--system` (whole system)",
      ]),

      h('Linking a local project to GitHub'),
      p("Create a new repository on GitHub, then either clone it (if you have no local repo yet) or link your existing local repo:"),
      code(`
# in a folder where git init has already been run
$ git remote add origin https://github.com/your-username/your-repo-name.git`),
      p("`origin` is the usual name for the remote. After this, `git push` / `git pull` synchronize the local and remote repositories."),

      h('git push'),
      code(`$ git push -u origin main`),
      p("`git push` sends the **committed** changes of your current branch **to the remote repository**. `-u` remembers `origin/main` as the default (upstream), so next time `git push` alone is enough."),

      h('git pull and git fetch'),
      ul([
        "`git pull` gets data from the remote repository: **git pull = git fetch + git merge**.",
        "`git fetch` **downloads** remote changes into your local repository **without changing your working files**.",
        "`git pull` fetches **and then merges** them into your current branch (your files change).",
      ]),

      h('git clone'),
      code(`$ git clone https://github.com/twbs/bootstrap.git`),
      p("`git clone` **downloads an existing repository** (with its whole history) to your computer as a local copy."),

      h("Moving changes between Git's areas"),
      table(
        ['Command', 'From → To'],
        [
          ['git add', 'working directory → staging area'],
          ['git commit', 'staging area → local repository'],
          ['git push', 'local repository → remote repository'],
          ['git fetch', 'remote repository → local repository (working files unchanged)'],
          ['git merge', 'merges the fetched/other branch changes into your branch and files'],
          ['git pull', 'remote → local repository + working directory (fetch + merge)'],
          ['git restore --staged <file>', 'unstage: staging area → back to working directory'],
          ['git restore <file>', 'discard changes in the working directory'],
        ],
      ),

      h('Publishing with GitHub Pages'),
      p("GitHub Pages makes the files in your repository accessible **as a website** instead of just files. The site is available at **myuser.github.io/myrepository**."),

      h('Tagging versions'),
      ul([
        "A **tag** marks a specific commit as a **named version**.",
        "Use tags for releases, milestones or stable versions.",
        "Tags appear under \"Tags\" in your GitHub repository.",
      ]),
      code(`
$ git tag v1-html            # create a tag
$ git push origin v1-html    # push the tag to GitHub
$ git tag                    # list all tags`),

      h('GitHub Releases'),
      p("A **Release = a tag + a description + downloadable files**. It gives users a clear way to download a specific version (as a ZIP) without needing Git."),
      ol([
        "Go to your repository on GitHub.",
        "Click Releases → Create a new release.",
        "Choose a tag (or create one).",
        "Add a title and description.",
        "Publish the release.",
      ]),
    ],
  },
  {
    id: 'git-branching',
    title: 'Collaboration and branching',
    from: '4 – git & GitHub',
    blocks: [
      h('Collaboration in remote repositories'),
      p("Several people push to and pull from the same remote repository. The owner adds **collaborators** on GitHub (Settings → Collaborators → Add people) so they get push access."),

      h('Branching enables isolated feature work'),
      ul([
        "**Isolated feature work**: each feature is developed on its own branch.",
        "**Safer** than working directly on `main`.",
        "Enables **collaboration without overwriting each other's work**.",
      ]),
      h('Basic branch commands'),
      code(`
$ git branch                   # list existing branches
$ git branch name_of_branch    # create a new branch
$ git switch name_of_branch    # switch to a branch
$ git switch -c name_of_branch # shortcut: create AND switch
$ git branch -d name_of_branch # delete a branch (clean up after merge)`),
      p("Modern Git (2.23+) splits the old `checkout` command:"),
      ul([
        "`git switch` → for switching branches",
        "`git restore` → for restoring files",
        "`git checkout` → does both (older, still works; you will see it in older tutorials)",
      ]),

      h('Merging branches'),
      code(`
$ git switch -c name_of_branch   # 1. create a branch and switch to it
# 2. edit files, git add, git commit ...
$ git switch main                # 3. when ready, switch to main
$ git merge name_of_branch       # 4. merge the feature branch into main`),
      tip("To merge a feature into main you must be **on main** first, then `git merge feature`."),

      h('Clone vs. fork'),
      table(
        ['clone', 'fork'],
        [
          ['Copies an existing repo **to your own computer** (a local copy).', 'Makes a **remote copy** of someone else\'s repo **under your own GitHub account**.'],
          ['Use it to get a local working copy, to work on a repo where you already have access, or to download your own repo.', 'Use it when you have no permission to push to the original repo, want your own writable copy on GitHub, or want to contribute back with a pull request.'],
          ['E.g. you only want to use/build/install the project locally.', 'E.g. you want to contribute to an open-source project.'],
        ],
      ),
      p("**fork + clone**: when contributing to someone else's project you almost always **fork first, then clone your fork**."),

      h('Pull request workflow'),
      p("fork → branch → commit & push → pull request → review → merge"),
      ol([
        "Fork the project to your own GitHub account.",
        "Clone your fork.",
        "Create a branch for your changes.",
        "Commit and push your work to your fork.",
        "Open a pull request against the original repo.",
        "Review and discussion: maintainers comment and may request changes.",
        "Merge: the maintainers merge it.",
      ]),
    ],
  },
  {
    id: 'git-problems',
    title: 'Problem solving: common Git problems',
    from: '4 – git & GitHub',
    blocks: [
      h('Problem-solving mindset'),
      ol([
        "Run `git status` – always start here.",
        "Identify your current branch.",
        "Ask: is the problem local, branch-related or remote?",
        "Read the error message carefully.",
        "Do not force-push or delete anything unless you know why.",
      ]),

      h('Merge conflict'),
      p("**What happened**: you merged one branch into another and Git stopped with a conflict. The file shows markers `<<<<<<<`, `=======` and `>>>>>>>`."),
      p("**Why**: two branches changed **the same lines in the same file** differently. Git cannot decide which version to keep, so it asks you."),
      code(`
<<<<<<< HEAD
<h1>Welcome to Kažigram</h1>
=======
<h1>Welcome to Catgram!</h1>
>>>>>>> feature-rename`),
      plain("Between `<<<<<<< HEAD` and `=======` is the version of your current branch. Between `=======` and `>>>>>>> feature-rename` is the version from the branch you are merging."),
      p("**What to do:**"),
      ol([
        "`git status` – see which files have conflicts.",
        "Open the conflicted file.",
        "Find the markers `<<<<<<< HEAD` and `>>>>>>> branch_name`.",
        "Choose which version to keep (or combine both).",
        "Remove all conflict markers.",
        "Save the file.",
        "`git add <filename>`",
        "`git commit -m \"resolve merge conflict\"`",
      ]),
      p("Conflicts are normal in teamwork. Don't leave markers in the file (Git won't finish the merge) and don't force-push to overwrite the other branch's changes."),

      h('Push rejected (remote ahead)'),
      code(`
! [rejected]        main -> main (non-fast-forward)
Updates were rejected because the remote contains work that you do not have locally`),
      p("**Why**: someone else pushed to the same branch before you, or you edited something directly on GitHub (e.g. README.md). Your local branch is **behind** the remote."),
      ol([
        "`git pull` – fetch and merge the remote changes.",
        "Resolve merge conflicts if they appear.",
        "`git push` – now it works.",
      ]),
      p("Don't use `git push --force` (you could delete other people's work) and don't delete your local repo and start over."),

      h('Committed on the wrong branch'),
      p("**Why**: it is easy to forget which branch you are on. Always check with `git status` before starting new work."),
      p("**If NOT yet pushed (only local):**"),
      code(`
$ git reset --soft HEAD~1    # undo the last commit, changes stay in the staging area
$ git stash                  # save the changes temporarily
$ git switch correct-branch
$ git stash pop              # bring the changes back
$ git add .
$ git commit -m "your message"`),
      p("**If already pushed (on GitHub):**"),
      code(`
$ git switch -c new-branch       # create a new branch from the current state
$ git push -u origin new-branch  # push the new branch to GitHub
$ git switch main                # go back to main
$ git log --oneline              # find the id of the wrong commit
$ git revert <commit-id>         # undo the wrong commit on main (with a new commit)
$ git push                       # share the fix`),
      plain("`revert` does not rewrite history: it adds a new commit that undoes the old one, so it is safe on a shared branch. Don't force-push to rewrite shared history."),

      h('Detached HEAD'),
      p("**What happened**: Git says \"You are in 'detached HEAD' state\"."),
      p("**Why**: you checked out a **specific commit** (`git checkout <commit-hash>`) instead of a branch. You are not on any branch – you are floating at one commit."),
      p("Don't commit new work there without creating a branch first: those commits can get \"lost\" (unreferenced and eventually garbage-collected)."),
      code(`
$ git switch main                # just wanted to look at the old version: go back
$ git switch -c new-branch-name  # want to keep changes made here: create a branch`),

      h('Accidentally tracked files'),
      p("**Why**: you ran `git add .` without a `.gitignore`, or added the file before `.gitignore` was set up. Deleting the file locally is not enough – Git still tracks it."),
      code(`
$ git rm --cached <filename>          # stop tracking the file (keep it locally)
$ git rm --cached -r <folder-name>    # same for a folder
$ echo "node_modules/" >> .gitignore  # prevent it in the future
$ git add .gitignore
$ git commit -m "chore: ignore node_modules"
$ git push`),
      p("**Important:** after this cleanup the file is **still in the Git history** – anyone can look at old commits."),
      ul([
        "**Just clutter** (node_modules, build files, logs): the cleanup above is enough.",
        "**Secrets you can change** (passwords, API keys): **rotate the secret immediately** – change the password / create a new key. The old one stays visible in history but is no longer usable.",
        "**Sensitive data you cannot change** (personal data, private documents): remove it from history with `git filter-repo` or BFG Repo-Cleaner, force-push the rewritten history, notify the team (they must re-clone). Others may already have cloned it.",
      ]),
      tip("Prevention is much easier than cleanup: always set up `.gitignore` before the first commit."),

      h('Authentication fails'),
      p("**What happened**: \"remote: Support for password authentication was removed ...\". **Why**: GitHub no longer accepts your account password for Git operations. You need a **Personal Access Token (PAT)** or **SSH keys**."),
      ul([
        "**Option 1: Personal Access Token.** GitHub → Settings → Developer settings → Personal Access Tokens → Generate new token, select \"repo\" permissions, copy it (shown only once), and paste it when Git asks for a password. The remote URL stays HTTPS.",
        "**Option 2: SSH keys.** `ssh-keygen -t ed25519 -C \"your@email.com\"`, copy the public key (`cat ~/.ssh/id_ed25519.pub`), add it on GitHub (Settings → SSH and GPG keys → New SSH key), and switch the remote to SSH: `git remote set-url origin git@github.com:username/repo.git`.",
        "**Option 3: VS Code Git integration.** The Source Control panel handles authentication by opening a browser window to sign in to GitHub.",
      ]),
      p("Never commit tokens or keys to the repository – treat them like passwords."),

      h('Summary'),
      ul([
        "Version control avoids messy file copies and overwrites and keeps a clear history.",
        "Essential commands: git init, git status, git add, git commit, plus .gitignore.",
        "Good commit messages describe what and why.",
        "git is the tool, GitHub is a cloud platform for hosting and collaboration.",
        "git push sends, git pull receives, git clone downloads an existing repo.",
        "clone = local copy; fork = your own remote copy on GitHub, for pull requests.",
        "Branches enable isolated feature work: branch, commit, merge back to main.",
        "When something goes wrong, start with git status and use the known recovery patterns.",
      ]),
    ],
  },
  {
    id: 'ai-work',
    title: 'Working with AI (course review)',
    from: '13 – Course review',
    blocks: [
      h('Copy-paste is not prompt engineering'),
      p("Effective prompting requires **understanding what you are building**."),
      table(
        ['Patterns that create problems', 'Patterns that work better'],
        [
          ['Pasting the whole assignment and asking for a solution', 'Break the problem into small steps'],
          ["Accepting code you don't understand", "Ask about concepts you don't understand"],
          ['Applying changes without checking what they do', 'Ask for specific changes to the existing code you shared'],
          ['Assuming the first answer is the right one', 'Ask AI to explain a solution and consider different options before applying one'],
        ],
      ),
      p("The difference is not about knowing everything – it is about being able to make **informed decisions** about what AI suggests."),
      h('The role of your understanding'),
      p("You can get code from AI, a tutorial, a template or a colleague. The question is what happens when the app breaks, a user reports a bug, the requirements change, the code becomes yours to maintain, or someone asks who is accountable."),
      p("**AI-generated code is like any other code you didn't write yourself: someone has to understand it before it can be trusted, changed or explained.**"),
      h('Custom agents in AI coding tools'),
      p("Coding tools let you configure how the AI responds in a specific project: what role it plays (assistant, tutor, reviewer), what it should and shouldn't do, and how it should respond."),
    ],
  },
]

const mcq = [
  {
    id: 'gh-m1',
    q: 'Who created Git, and for what purpose?',
    options: [
      'GitHub Inc., to host websites',
      'Linus Torvalds, to manage the development of the Linux kernel',
      'Tim Berners-Lee, to share hypertext documents',
      'Microsoft, to replace Visual Studio',
    ],
    answer: 1,
    explain: 'Git was created by Linus Torvalds in 2005 to manage the development of the Linux kernel.',
  },
  {
    id: 'gh-m2',
    q: "Where does Git store a project's history?",
    options: ['In a .git/ folder inside the project folder', 'Only on GitHub servers', 'In the .gitignore file', 'In the browser cache'],
    answer: 0,
    explain: 'A Git repository is a .git/ folder inside the project. It tracks all changes and builds the history.',
  },
  {
    id: 'gh-m3',
    q: 'Which command shows the state of the working directory and the staging area?',
    options: ['git log', 'git commit', 'git status', 'git push'],
    answer: 2,
    explain: 'git status shows modified, staged and untracked files (and the current branch).',
  },
  {
    id: 'gh-m4',
    q: 'You have edited index.html and want to include it in the next commit. Which command moves it to the staging area?',
    options: ['git commit index.html', 'git push index.html', 'git restore index.html', 'git add index.html'],
    answer: 3,
    explain: 'git add moves changes from the working directory to the staging area. git restore would discard the changes.',
  },
  {
    id: 'gh-m5',
    q: 'You have finished editing and want to save the changes permanently to your local repository. Which command do you use?',
    options: ['git commit', 'git push', 'git status', 'git add'],
    answer: 0,
    explain: 'git commit saves a snapshot of the staged changes to the local repository. git push sends commits to the remote.',
  },
  {
    id: 'gh-m6',
    q: 'What uniquely identifies each commit in Git?',
    options: ['The commit message', 'The date and time of the commit', 'A SHA-1 hash', 'The branch name'],
    answer: 2,
    explain: 'Each commit has a unique identifier, a SHA-1 hash (shown in short form by git log --oneline).',
  },
  {
    id: 'gh-m7',
    q: 'passwords.txt was committed in an earlier commit. You now add passwords.txt to .gitignore. What happens?',
    options: [
      'Git deletes the file from history automatically',
      'Nothing changes: the file is still tracked until you untrack it with git rm --cached',
      'GitHub hides the file from other users',
      'The file is deleted from your computer',
    ],
    answer: 1,
    explain: 'Once a file is tracked, .gitignore alone will not help. You must untrack it manually (git rm --cached).',
  },
  {
    id: 'gh-m8',
    q: 'Following the commit naming convention from the course, which prefix fits a commit that fixes a bug?',
    options: ['feat:', 'docs:', 'chore:', 'fix:'],
    answer: 3,
    explain: 'feat = new feature, fix = bug fix, docs = documentation only, chore = build process or tools.',
  },
  {
    id: 'gh-m9',
    q: 'How do Git and GitHub relate to each other?',
    options: [
      'Git runs locally on your computer; GitHub hosts repositories online and supports collaboration',
      'GitHub is a required add-on that must be installed for Git to work',
      'Git is a command-line tool and GitHub is only its graphical interface',
      'Git automatically syncs every change to GitHub',
    ],
    answer: 0,
    explain: 'git = version control locally. GitHub = cloud platform for hosting and collaboration (GitLab, Bitbucket, Codeberg are alternatives).',
  },
  {
    id: 'gh-m10',
    q: 'A setting is configured with both git config --global and git config --local. Which value is used inside that project?',
    options: ['The --global value', 'The --system value', 'The --local value', 'Git asks you every time'],
    answer: 2,
    explain: 'Priority: --local (project) > --global (user) > --system. Local overrides global in that folder.',
  },
  {
    id: 'gh-m11',
    q: 'What does git remote add origin https://github.com/user/repo.git do?',
    options: [
      'Links the local repository to a remote repository called origin',
      'Downloads the remote repository into a new folder',
      'Creates a new repository on GitHub',
      'Pushes all commits to GitHub',
    ],
    answer: 0,
    explain: 'It links an existing local repo to a remote named origin. After that, git push/pull synchronize the two.',
  },
  {
    id: 'gh-m12',
    q: 'Which statement about git pull is correct?',
    options: [
      'git pull sends your commits to the remote',
      'git pull only downloads changes and never changes your files',
      'git pull deletes local commits that are not on the remote',
      'git pull = git fetch + git merge',
    ],
    answer: 3,
    explain: 'fetch downloads remote changes without changing working files; pull fetches and then merges.',
  },
  {
    id: 'gh-m13',
    q: 'What is the difference between a clone and a fork?',
    options: [
      'A clone is a copy on GitHub; a fork is a copy on your computer',
      'A clone is a local copy on your computer; a fork is a remote copy under your own GitHub account',
      'They are the same, but fork only works on public repositories',
      'A fork can only be made of your own repositories',
    ],
    answer: 1,
    explain: 'clone = local copy. fork = remote copy of someone else\'s repo under your account (to contribute via pull request).',
  },
  {
    id: 'gh-m14',
    q: "You want to contribute to an open-source project but you have no push permission. What is the usual workflow?",
    options: [
      'Clone the original repo and push directly to its main branch',
      'Email your files to the maintainers',
      'Fork → clone your fork → branch → commit & push to your fork → open a pull request',
      'Create a tag on the original repository',
    ],
    answer: 2,
    explain: 'Pull request workflow: fork → branch → commit & push → pull request → review → merge.',
  },
  {
    id: 'gh-m15',
    q: 'What does git switch -c feature-login do?',
    options: [
      'Creates a new branch called feature-login and switches to it',
      'Deletes the branch feature-login',
      'Merges feature-login into the current branch',
      'Lists all branches that contain "feature-login"',
    ],
    answer: 0,
    explain: 'git switch -c = create and switch in one command.',
  },
  {
    id: 'gh-m16',
    q: 'Your feature is finished on the branch feature-likes. How do you merge it into main?',
    options: [
      'Stay on feature-likes and run git merge main',
      'Run git switch main, then git merge feature-likes',
      'Run git push feature-likes main',
      'Run git branch -d main',
    ],
    answer: 1,
    explain: 'Switch to the branch that should receive the changes (main), then merge the feature branch into it.',
  },
  {
    id: 'gh-m17',
    q: 'Why does a merge conflict happen?',
    options: [
      'Because the remote repository is offline',
      'Because a file is missing from .gitignore',
      'Because you used git switch instead of git checkout',
      'Because two branches changed the same lines of the same file differently',
    ],
    answer: 3,
    explain: 'Git cannot decide which version of the same lines to keep, so it asks you to resolve the conflict.',
  },
  {
    id: 'gh-m18',
    q: 'git push is rejected with "non-fast-forward: the remote contains work that you do not have locally". What should you do?',
    options: [
      'Run git pull, resolve any conflicts, then git push again',
      'Run git push --force to overwrite the remote',
      'Delete the local repository and clone it again',
      'Create a new repository on GitHub',
    ],
    answer: 0,
    explain: 'Your local branch is behind. Pull first, resolve conflicts, then push. Force-push could delete other people\'s work.',
  },
  {
    id: 'gh-m19',
    q: 'You accidentally pushed a file containing an API key. After removing it with git rm --cached, what is the most important next step?',
    options: [
      'Nothing; the key is no longer visible anywhere',
      'Rename the file and push it again',
      'Rotate the key (create a new one and disable the old one), because the old key stays in the Git history',
      'Make the repository private and keep using the same key',
    ],
    answer: 2,
    explain: 'The file is still in history. For secrets you can change, rotate them immediately so the exposed one is useless.',
  },
  {
    id: 'gh-m20',
    q: 'What is a GitHub Release?',
    options: [
      'A branch that is protected from changes',
      'A tag + description + downloadable files for a specific version',
      'A copy of a repository under another account',
      'The website published by GitHub Pages',
    ],
    answer: 1,
    explain: 'A Release is built on a tag and lets users download a specific version as a ZIP without Git.',
  },
]

const essays = [
  {
    id: 'gh-e1',
    prompt: 'Consider the following commands:',
    code: trimCode(`
$ mkdir catsite
$ cd catsite
$ git init
$ echo "node_modules/" > .gitignore
$ git add .
$ git commit -m "feat: first version of the cat site"
$ git log --oneline`),
    parts: [
      { label: 'a', text: 'What does git init (line 3) do?' },
      { label: 'b', text: 'Explain what lines 5 and 6 do, using the areas of a Git project.' },
      { label: 'c', text: 'Why is .gitignore created before the first commit? What does line 7 show?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'It turns the folder into a Git repository by creating the hidden .git/ folder, where Git stores the history of all changes.' },
      { label: 'b', text: 'git add . moves all files (their current changes) from the working directory to the staging area. git commit -m "..." saves a snapshot of everything staged into the local repository, with a message that identifies this version.' },
      { label: 'c', text: 'git add . stages every file, so .gitignore must exist first to keep unwanted files (here node_modules) from being tracked; once a file is tracked, .gitignore alone does not help. git log --oneline shows the commit history in short form: each commit\'s short SHA-1 id and its message.' },
    ],
    keyPoints: [
      'git init creates the repository (.git folder)',
      'git add: working directory → staging area',
      'git commit: staging area → local repository (snapshot + message)',
      '.gitignore first so unwanted files are never tracked',
      'git log --oneline: history with commit ids and messages',
    ],
  },
  {
    id: 'gh-e2',
    prompt: 'Consider the following commands:',
    code: trimCode(`
$ git remote add origin https://github.com/toast/catsite.git
$ git push -u origin main
# ... a teammate pushes new commits to main ...
$ git fetch
$ git pull`),
    parts: [
      { label: 'a', text: 'What does line 1 do, and what is origin?' },
      { label: 'b', text: 'What happens on line 2?' },
      { label: 'c', text: 'What is the difference between git fetch (line 4) and git pull (line 5)?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'It links the local repository to a remote repository on GitHub. origin is the name given to that remote URL, so later commands can refer to it.' },
      { label: 'b', text: 'git push sends the committed changes of the local main branch to the main branch of the remote (origin). -u sets origin/main as the default upstream, so later just "git push" or "git pull" is enough.' },
      { label: 'c', text: 'git fetch downloads the teammate\'s new commits into the local repository but does not change your working files. git pull = git fetch + git merge: it downloads and then merges the changes into your branch, so your files are updated.' },
    ],
    keyPoints: [
      'remote add links local repo to GitHub repo',
      'origin = name of the remote',
      'push sends committed changes to the remote',
      '-u remembers the upstream branch',
      'fetch downloads without changing working files',
      'pull = fetch + merge',
    ],
  },
  {
    id: 'gh-e3',
    prompt: 'Consider the following commands:',
    code: trimCode(`
$ git switch -c feature-likes
# ... edit like.js ...
$ git add like.js
$ git commit -m "feat: add like button"
$ git switch main
$ git merge feature-likes
$ git branch -d feature-likes`),
    parts: [
      { label: 'a', text: 'Explain what lines 1, 5 and 6 do.' },
      { label: 'b', text: 'Why is the feature developed on a branch instead of directly on main?' },
      { label: 'c', text: 'What does line 7 do, and why is it fine to run it here?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Line 1 creates a new branch feature-likes and switches to it. Line 5 switches back to the main branch. Line 6 merges the commits of feature-likes into main.' },
      { label: 'b', text: 'Branches allow isolated feature work: main stays stable while the feature is unfinished, it is safer than working directly on main, and several people can work at the same time without overwriting each other\'s work.' },
      { label: 'c', text: 'It deletes the feature-likes branch. The work is not lost because it has already been merged into main; deleting is just cleanup.' },
    ],
    keyPoints: [
      'switch -c creates and switches to a branch',
      'switch main goes back to main',
      'merge brings feature commits into main',
      'branch = isolated, safer, no overwriting others',
      'branch -d deletes the branch; safe because already merged',
    ],
  },
  {
    id: 'gh-e4',
    prompt: 'After running git merge feature-rename, the file index.html contains:',
    code: trimCode(`
<<<<<<< HEAD
<h1>Welcome to Kažigram</h1>
=======
<h1>Welcome to Catgram!</h1>
>>>>>>> feature-rename`),
    parts: [
      { label: 'a', text: 'Why did this happen?' },
      { label: 'b', text: 'What do the markers <<<<<<< HEAD, ======= and >>>>>>> feature-rename mean?' },
      { label: 'c', text: 'List the steps to resolve the conflict.' },
    ],
    modelAnswer: [
      { label: 'a', text: 'It is a merge conflict: the current branch and feature-rename both changed the same line of the same file in different ways, and Git cannot decide which version to keep.' },
      { label: 'b', text: 'The part between <<<<<<< HEAD and ======= is the version from the current branch (HEAD). The part between ======= and >>>>>>> feature-rename is the version from the branch being merged.' },
      { label: 'c', text: 'Run git status to see the conflicted files, open the file, choose which version to keep (or combine them), delete all conflict markers, save, then git add index.html and git commit -m "resolve merge conflict".' },
    ],
    keyPoints: [
      'merge conflict: same lines changed differently in two branches',
      'HEAD part = current branch',
      'other part = merged branch',
      'choose/combine, remove markers, save',
      'git add + git commit to finish',
    ],
  },
  {
    id: 'gh-e5',
    prompt: 'You try to push and get this message:',
    code: trimCode(`
$ git push
To https://github.com/toast/catsite.git
 ! [rejected]        main -> main (non-fast-forward)
error: failed to push some refs to 'https://github.com/toast/catsite.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally.`),
    parts: [
      { label: 'a', text: 'What happened, and what are two possible reasons?' },
      { label: 'b', text: 'How do you fix it?' },
      { label: 'c', text: 'Why should you not use git push --force here?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'The remote main branch has commits that your local branch does not have, so your local branch is behind and Git refuses the push. Reasons: someone else pushed to the same branch first, or you edited a file directly on GitHub (e.g. README.md).' },
      { label: 'b', text: 'Run git pull to fetch and merge the remote changes, resolve merge conflicts if any appear, then run git push again.' },
      { label: 'c', text: 'Force-push would overwrite the remote branch with your version and delete other people\'s commits. Also don\'t delete your local repo and start over.' },
    ],
    keyPoints: [
      'remote is ahead / local branch is behind',
      'someone else pushed, or edited on GitHub',
      'fix: git pull, resolve conflicts, git push',
      '--force would delete others\' work',
    ],
  },
  {
    id: 'gh-e6',
    prompt: 'You committed on main, but the work should have gone to the branch feature-dark. You have NOT pushed yet. You run:',
    code: trimCode(`
$ git reset --soft HEAD~1
$ git stash
$ git switch feature-dark
$ git stash pop
$ git add .
$ git commit -m "feat: add dark mode"`),
    parts: [
      { label: 'a', text: 'How could this mistake have been avoided?' },
      { label: 'b', text: 'Explain what lines 1–4 do.' },
      { label: 'c', text: 'What would you do instead if the wrong commit had already been pushed to GitHub?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'By checking the current branch with git status before starting new work.' },
      { label: 'b', text: 'Line 1 undoes the last commit but keeps its changes in the staging area. Line 2 saves those changes temporarily in the stash. Line 3 switches to the correct branch. Line 4 brings the stashed changes back into the working directory there; then they are added and committed on the right branch.' },
      { label: 'c', text: 'Don\'t rewrite shared history. Create a branch from the current state (git switch -c new-branch) and push it (git push -u origin new-branch). Then switch to main, find the wrong commit id with git log --oneline, undo it with git revert <commit-id>, and git push.' },
    ],
    keyPoints: [
      'check branch with git status first',
      'reset --soft HEAD~1: undo commit, keep changes staged',
      'stash saves changes temporarily',
      'switch to the correct branch, stash pop brings changes back',
      'if pushed: new branch + push, then git revert on main + push (no force-push)',
    ],
  },
  {
    id: 'gh-e7',
    prompt: 'A file config.env with the line API_KEY=sk-12345 was committed and pushed. You then run:',
    code: trimCode(`
$ git rm --cached config.env
$ echo "config.env" >> .gitignore
$ git add .gitignore
$ git commit -m "chore: stop tracking config.env"
$ git push`),
    parts: [
      { label: 'a', text: 'What do lines 1 and 2 do?' },
      { label: 'b', text: 'Is the API key safe after these commands? Why or why not?' },
      { label: 'c', text: 'What must you do about the key? What would be needed if the file contained personal data instead?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'Line 1 stops tracking config.env but keeps the file on your computer. Line 2 adds config.env to .gitignore so it will not be tracked again in the future.' },
      { label: 'b', text: 'No. The file is still in the Git history: anyone can look at the old commits on GitHub and see the key.' },
      { label: 'c', text: 'Rotate the secret immediately: create a new key and disable the old one, so the exposed key is useless. Personal data cannot be "changed", so it must be removed from the history with git filter-repo or BFG Repo-Cleaner, the rewritten history force-pushed, and the team notified to re-clone (others may already have copies).' },
    ],
    keyPoints: [
      'rm --cached stops tracking, keeps file locally',
      '.gitignore prevents tracking in future',
      'key still in Git history → not safe',
      'rotate the key immediately',
      'personal data: filter-repo/BFG, force-push, notify team',
    ],
  },
  {
    id: 'gh-e8',
    prompt: 'You want to fix a typo in the README of an open-source project you do not own:',
    code: trimCode(`
# On GitHub: click "Fork" on github.com/twbs/bootstrap
$ git clone https://github.com/toast/bootstrap.git
$ git switch -c fix-typo
# ... fix the typo in README.md ...
$ git add README.md
$ git commit -m "docs: fix typo in README"
$ git push -u origin fix-typo
# On GitHub: open a pull request`),
    parts: [
      { label: 'a', text: 'What is the difference between the fork (line 1) and the clone (line 2)?' },
      { label: 'b', text: 'Why do you fork instead of just cloning the original repo and pushing to it?' },
      { label: 'c', text: 'What happens after you open the pull request?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'The fork makes a remote copy of the original repository under your own GitHub account. The clone then downloads your fork to your computer as a local copy.' },
      { label: 'b', text: 'You have no permission to push to the original repo. The fork gives you your own writable copy on GitHub where you can push, and from there you can contribute back with a pull request.' },
      { label: 'c', text: 'The maintainers of the original project review the changes, discuss and may request modifications. When they are happy, they merge the pull request into the original repository.' },
    ],
    keyPoints: [
      'fork = remote copy under your account',
      'clone = local copy on your computer',
      'no push permission to original → fork',
      'pull request asks to merge changes back',
      'review/discussion, then maintainers merge',
    ],
  },
  {
    id: 'gh-e9',
    prompt: 'Consider the following commands:',
    code: trimCode(`
$ git tag v1-html
$ git push origin v1-html
$ git tag
v1-html`),
    parts: [
      { label: 'a', text: 'What is a tag, and why would you create one?' },
      { label: 'b', text: 'What is the difference between a tag and a GitHub Release?' },
      { label: 'c', text: 'How can the project be published as a website with GitHub Pages, and what is the address?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'A tag marks a specific commit as a named version (here v1-html). Tags are used for releases, milestones or stable versions. Line 2 pushes the tag to GitHub, line 3 lists all tags.' },
      { label: 'b', text: 'A Release = a tag + a title/description + downloadable files. It gives users a clear way to download that version (e.g. as a ZIP) without needing Git.' },
      { label: 'c', text: 'Enable GitHub Pages in the repository settings (choose the branch/folder to publish). The files are then served as a website at myuser.github.io/myrepository.' },
    ],
    keyPoints: [
      'tag = named version of a specific commit',
      'used for releases/milestones',
      'release = tag + description + downloadable files',
      'GitHub Pages serves repo files as a website',
      'address username.github.io/repository',
    ],
  },
  {
    id: 'gh-e10',
    prompt: 'You run the following command and Git prints a warning:',
    code: trimCode(`
$ git checkout 4f2a9c1
Note: switching to '4f2a9c1'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.`),
    parts: [
      { label: 'a', text: 'What does "detached HEAD" mean, and why did it happen?' },
      { label: 'b', text: 'Why is it risky to commit new work in this state?' },
      { label: 'c', text: 'What should you do if you only wanted to look, and what if you want to keep changes you made here?' },
    ],
    modelAnswer: [
      { label: 'a', text: 'You checked out a specific commit (4f2a9c1) instead of a branch. HEAD now points directly to that commit, so you are not on any branch.' },
      { label: 'b', text: 'Commits made here belong to no branch. When you switch away they become unreferenced, can get "lost" and are eventually garbage-collected.' },
      { label: 'c', text: 'Just looking: go back with git switch main. Keeping changes: create a branch at this point with git switch -c new-branch-name.' },
    ],
    keyPoints: [
      'checked out a commit instead of a branch',
      'not on any branch',
      'new commits can be lost (unreferenced, garbage-collected)',
      'git switch main to go back',
      'git switch -c new-branch to keep changes',
    ],
  },
]

export default {
  id: 'git-github',
  title: 'Git & GitHub',
  short: 'Git & GitHub',
  slides: ['4 – git & GitHub', '13 – Course review (Working with AI)'],
  intro: 'Version control, the local workflow, remotes, branching and pull requests, fixing common Git problems, and working with AI.',
  theory,
  mcq,
  essays,
}
