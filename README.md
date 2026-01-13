## ARBergman Drafting

This is the new site for Alex that is the migration to nextJS

## Renumber images command

```bash
mkdir -p temp && i=1 && for file in $(ls *.jpg | sort -V); do cp "$file" "temp/$i.jpg" && ((i++)); done && rm -f *.jpg && mv temp/* . && rmdir temp && echo "Renumbered $((i-1)) files"
```

### To Dos
- Add the Email API service for the mailer on the contact
