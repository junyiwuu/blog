---
title: Git
description: remember details about how to use ssh key to push to github
---
## Git 

1. **initialize**: `git init`
2. **Add all**: `git add .`
3. **Commit**: `git commit -m "comment...
	1. **Withdraw current commit**: 
		1. `git reset` = `git reset --mixed HEAD~1` : withdraw commit and staging area, keep working directory
		2. `git reset --soft HEAD~1`: withdraw commit, keep staging area and working directory
		3. `git reset --hard HEAD~1`: withdraw everything (dangerous)

4. **Ignore some files** : `touch .gitignore` `nano .gitignore`
5. **Check git status**: 
	1. `git status`
	2. `git diff` : check changes not in staging area
	3. `git diff --staged` : check changes already in the staging area
6. **Check what files been tracked**: `git ls-files`
	1.**Delete tracked files cache (not delete file itself :** `git rm -r --cached build/`
7. **Change the branch name**: `git branch -M main`
8. **Add to Github**: `git remote add origin git@github.com:username/repo.git`
9. **Use SSH**: `git remote set-url origin git@github.com:username/repo.git`
10. **Push**: `git push -u origin main`



## Git + ssh
### List all ssh key currently own on the machine

```bash
ls -al ~/.ssh/
```


### Generate one 
`ssh-keygen -t ed25519 -C "your_email@example.com"`



### Check your public key
```bash
cat ~/.ssh/id_ed25519.pub
```


### Change using HTTP  to SSH
```bash
git remote set-url origin git@github.com:username/repo.git
```


## Recursive
**Recursive clone**: `git clone --recurse-submodules <repo_url>`
If already cloned, **update recursive**: `git submodule update --init --recursive`
`git clone --recursive https://github.com/pytorch/pytorch`