---
title: Issues
description: record the issues that I met
---
##  Recursively changed the permission of /usr

**result:** not successfully restore the system, re-install Rocky Linux in the end
### Restoring RPM package permissions and ownership
`sudo rpm --setperms -a` : restoring the permissions
`sudo rpm --setugids -a`: restoring the ownership


- test