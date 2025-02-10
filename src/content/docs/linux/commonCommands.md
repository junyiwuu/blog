---
title: Common Commands
description: Record the commands that I met
---
## Folder permission
---
### Check folder permission
`ls -ld /path/to`
####  Check if you have write permission
````bash
[ -w /path/to/folder ] && echo "Writable" || echo "Not Writable"
````

---
### Understand output
`drwxr-xr-x. 12 root root 144 Jan 18 16:54 /usr`
* `d` : it is a directory
* `rwx`: The **owner** can read(**r**) write(**w**) execute(**x**).
* `r-x`: The **group** can read and execute but not write.
* `r--`: **Others** can only read.

---
### Change folder permission
#### Grant full ownership to yourself
`sudo chown your_username /path/to`
<span style="color: grey;">this is permanent change</span>
#### Grant group ownership
`sudo chown root:group_name /usr`

#### Grant group some permission
`sudo chmod 770 /path/to`
- `7` → **Owner (root)**: Read, Write, Execute
- `7` → **Group (your_username or users)**: Read, Write, Execute
- `0` → **Others**: No access

***Apply recursively***
`sudo chmod -R 770 /path/to/folder`


---
---
---
## Group
### Create a new group
`sudo groupadd __groupname__`

### Add a user to the group
`sudo usermod -aG _groupname_ _username_`
* `-aG`: append the user to the specified group

###  Lists users in a group
`getent group _groupname_`