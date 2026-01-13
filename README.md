## ARBergman Drafting

This is the new site for Alex that is the migration to nextJS

## Renumber images command

The command will renumber this files in a folder. It renders the first image (1.jpg) as the thumbnail and renders the images in the order.

1. Makes a temp folder
2. Loops through all .jpg files in sorted order
3. Copies each one to temp with a sequential number (1.jpg, 2.jpg, etc.)
4. Deletes the original files
5. Moves the renamed files back
6. Removes the temp folder
7. Prints how many files were renumbered


```bash
mkdir -p temp && i=1 && for file in $(ls *.jpg | sort -V); do cp "$file" "temp/$i.jpg" && ((i++)); done && rm -f *.jpg && mv temp/* . && rmdir temp && echo "Renumbered $((i-1)) files"
```

### To Dos
- Add the Email API service for the mailer on the contact
