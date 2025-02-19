---
title: Common Commands
description: Record the commands that I met
---
this is overview?


---
## Folder permission

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


---
---
---
## Mount
### Install 

```sh
sudo dnf install ntfs-3g
```

### Find the partition
```sh
lsblk
```

for example : /dev/sdb2

### Mount it 

```sh
sudo mount -t ntfs-3g /dev/sdb2 /mnt/D
```
`-t`: specify the file system type

**Make it always mount after reboot**:
```sh
sudo nano /etc/fstab
```
add line at the end: 
```
/dev/sdb2   /mnt/D   ntfs-3g   defaults   0   0
```
`defaults` : mount options
>- `rw` → Read & write access
>- `suid` → Allow set-user-ID programs
>- `dev` → Allow device files (e.g., `/dev/null`)
>- `exec` → Allow executing binaries
>- `auto` → Mount automatically at boot
>- `nouser` → Only root can mount
>- `async` → Enable asynchronous I/O


`0`:  Dump option, control filesystem backup 
> `0` means do not backup with the dump command

`0` : Filesystem check order,  controls `fsck` (filesystem check) at boot
>`0` means do not check (recommended for NTFS)
>Linux-native filesystems (like `ext4`) usually have `1` or `2` instead.

Then reload:
```sh
sudo mount -a
```
`-a`: mount all



---
---
---

## Finding

already in a folder, and want to find anything name with "aa" (recursively)
`find . -name "*aa*"`

`ls *aa*`






---
## Kernel
**Show current kernel**
`uname -r`

**List all kernels**
`rpm -q kernel`

**Remove certain kernel**
`sudo dnf remove kernel-<version>`
