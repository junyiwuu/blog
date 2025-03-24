


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





|                    |                                                                                 |
| ------------------ | ------------------------------------------------------------------------------- |
| `nmap -sV xxx.xxx` | find server software, also find  os name<br>                                    |
| `nmap -T5 xxx.xxx` | fast scan                                                                       |
| `nmap -sF xxx.xxx` | FIN scan. a request is sent with FIN flag                                       |
| `nmap -sN xxx.xxx` | NULL scan                                                                       |
| `nmap -sX xxx.xxx` | xmas scan. send a malformed TCP packet and expect RST response for closed ports |
|                    |                                                                                 |
