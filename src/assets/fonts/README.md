
# Custom Font 

These folder is meant to collecting custom font. To use these custom font, you need register all the custom font that you have in [app.scss](../../app/app.scss). Here is the example on how to register the custom font.

```css
@font-face {
    font-family: chlorinr;
    src: url(../../assets/fonts/chlorinr.ttf) format("truetype");
    font-weight: 200
}
```

Then how to use it inside your page

## Using tag style

```html
<ion-label style="font-family: chlorinr">
```

## Using css class and css id
```css
/* using css class */
.my-header {
    font-family: chlorinr;
}

/* using css id */
#my-button {
    font-family: chlorinr;
}
```
