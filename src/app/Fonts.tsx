'use client'
import { Global } from "@emotion/react"

const Fonts = () => {
  return(
    <Global styles={
      `@font-face {
        font-family:"pf-marlet-display";
        src:url("https://use.typekit.net/af/378378/0000000000000000774f2ae2/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"),url("https://use.typekit.net/af/378378/0000000000000000774f2ae2/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"),url("https://use.typekit.net/af/378378/0000000000000000774f2ae2/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-display:auto;
        font-style:normal;
        font-weight:700;
        font-stretch:normal;
        }

        /* urw-form */
        
        @font-face {
          font-family:"urw-form";
          src:url("https://use.typekit.net/af/45ecb0/00000000000000007735a7e3/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/45ecb0/00000000000000007735a7e3/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/45ecb0/00000000000000007735a7e3/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
          font-display:auto;
          font-style:normal;
          font-weight:400;
          font-stretch:normal;
          }

          @font-face {
            font-family:"urw-form";
            src:url("https://use.typekit.net/af/2686e6/00000000000000007735a7ee/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"),url("https://use.typekit.net/af/2686e6/00000000000000007735a7ee/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"),url("https://use.typekit.net/af/2686e6/00000000000000007735a7ee/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
            font-display:auto;
            font-style:normal;
            font-weight:500;
            font-stretch:normal;
            }
        
          @font-face {
            font-family:"urw-form";
            src:url("https://use.typekit.net/af/63a8e1/00000000000000007735a815/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"),url("https://use.typekit.net/af/63a8e1/00000000000000007735a815/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"),url("https://use.typekit.net/af/63a8e1/00000000000000007735a815/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
            font-display:auto;
            font-style:normal;
            font-weight:700;
            font-stretch:normal;
            }  
        
        
        
        `
    } />
  )
}


export default Fonts