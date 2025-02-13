---
title: ssh + Github
description: remember details about how to use ssh key to push to github
---

## List all ssh key currently own on the machine

```bash
ls -al ~/.ssh/
```


### Generate one 
`ssh-keygen -t ed25519 -C "your_email@example.com"`



## Check your public key
```bash
cat ~/.ssh/id_ed25519.pub
```






## Change using HTTP  to SSH
```bash
git remote set-url origin git@github.com:username/repo.git
```