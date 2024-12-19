import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles:{
    global:{
      blockquote: {
        paddingLeft: '16px',
        borderLeft: '4px solid #e2e8f0',
        fontStyle: 'italic',
        marginTop: '16px',
        marginBottom: '16px',
        color: '#4a5568',
      },
      li: {
        display: "list-item",
        textAlign: "-webkit-match-parent",
        fontSize:'18px'
      },
      ul: {
        paddingInlineStart: "20px",
        marginBlockStart: "1em",
        marginBlockEnd: "1em",
        
      },
      ol: {
        display: "block",
        listStyleType: "decimal",
        marginBlockStart: "1em",
        marginBlockEnd: "1em",
        marginInlineStart: "0px",
        marginInlineEnd: "0px",
        paddingInlineStart: "40px",
      },
      h2: {
        display: "block",
        fontSize: "1.5em",
        marginBlockStart: "0.83em",
        marginBlockEnd: "0.83em",
        marginInlineStart: "0px",
        marginInlineEnd: "0px",
        fontWeight: "bold",
      },
      strong: {
        fontWeight: "bold",
      },
      em: { fontStyle: "italic" },
    }

  },
  fonts: {
    heading: `'pf-marlet-display', serif`,
    body: `'urw-form', sans-serif`
  }
});


export default theme