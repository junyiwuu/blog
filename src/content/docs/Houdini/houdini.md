---
title: Houdini notes
---

**sudo launchctl start com.sidefx.sesinetd**

## Launch the server
issue: 
`http://localhost:1715: No server found running, please start the server before retrying`
Solve: `cd /usr/lib/sesi` --> `sudo ./sesinetd`


after install houdini and make it work: 
1. `cd /opt/hfs20.5`  
2. `source houdini_setup`
3.  if no libXss: `sudo dnf search libXss`  --> `sudo dnf install libXScrnSaver`
4. `houdini` then can start


