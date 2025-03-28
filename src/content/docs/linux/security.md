---
title: Security check
---


## View the pem


``openssl dhparam -in dhparams.pem -text -noout``
### check certificate

`openssl x509 -in cert.pem -text`



---
## Hash

`sha256sum order.json`

### HMAC

key + text
`openssl sha256 -hmac '3RfDFz82' order.txt`

### md5


`echo -n 'qwerty' | openssl md5`




## nmap





|                              |                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `nmap -sV xxx.xxx`           | find server software, also find  os name<br>                                    |
| `nmap -T5 xxx.xxx`           | fast scan                                                                       |
| `nmap -sF xxx.xxx`           | FIN scan. a request is sent with FIN flag                                       |
| `nmap -sN xxx.xxx`           | NULL scan                                                                       |
| `nmap -sX xxx.xxx`           | xmas scan. send a malformed TCP packet and expect RST response for closed ports |
| `nmap -p- xxx.xxx`           | scan 1000 most-common ports. where you can find hidden service port             |
| `nmap -sV -p <port> xxx.xxx` | find what software is listening on that port                                    |
|                              |                                                                                 |
* `-T<level>`: 
	* -T0: most safe, slowest, "paranoid mode", a port is scanned every 5 minutes
	* -T3, normal mode, a port is scanned every one second, but still need 18 hours to scan all ports
	* -T5: "insane mode", fastest, scan a port every 5 milliseconds. Unsafe, the administrator will see a scan
* check what is going on while a scan is running: press F to see the status 
---

## Cron


```
* * * * * command_to_run
│ │ │ │ │
│ │ │ │ └── 星期几 (0 - 7) (0 和 7 代表周日)
│ │ │ └──── 月份 (1 - 12)
│ │ └────── 日期 (1 - 31)
│ └──────── 小时 (0 - 23)
└────────── 分钟 (0 - 59)
```



| command      | Description                                                          |
| :----------- | :------------------------------------------------------------------- |
| `crontab -l` | list all cron jobs<br>                                               |
| `crontab -r` | delete all cron jobs                                                 |
| `crontab -e` | edit all crontab jobs. Also here you can find what cron job you have |
|              |                                                                      |




---

## traceroute



| command | Description                  |
| :------ | :--------------------------- |
| `eth0`  | ethernet connection<br>      |
| `wlan0` | wireless internet connection |
| `lo`    | loop back                    |
| `tun0`  | vpn interface                |



---

## Hydra



`hydra -l <username> -P <wordlist> MACHINE_IP http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V`

1. use `nmap -sT ipxxx` to find what protocol the user is using
2. for example if it is ssh, try `ssh alice@ipxxx` see if it is work
3. then use hydra find the password: `hydra -l <username> -P <full path to pass> MACHINE_IP -t 4 ssh`

if ftp: `hydra -l user -P passlist.txt ftp://MACHINE_IP`




---


## SSH
only Rocky linux, ssh is sshd

| command                       | Description                                             |
| :---------------------------- | :------------------------------------------------------ |
| `sudo systemctl status sshd`  | check where ssh server is running<br>                   |
| `sudo systemctl stop sshd`    | stop ssh service (but will start again after reboot     |
| `sudo systemctl disable sshd` | disable ssh entirely, so won't start again after reboot |


