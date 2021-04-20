
export let code = "\n  ._Button_85hye_2[data-type=\"primary\"] {\n    --tw-bg-opacity: 1;\n    background-color: rgba(96, 165, 250, var(--tw-bg-opacity));\n    --tw-text-opacity: 1;\n    color: rgba(255, 255, 255, var(--tw-text-opacity));\n  }\n._Button_85hye_2[data-type=\"secondary\"] {\n    background-color: transparent;\n    --tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);\n    -webkit-box-shadow: 0 0 rgba(0,0,0,0), 0 0 rgba(0,0,0,0), var(--tw-shadow);\n            box-shadow: 0 0 rgba(0,0,0,0), 0 0 rgba(0,0,0,0), var(--tw-shadow);\n    -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0,0,0,0)), var(--tw-ring-shadow, 0 0 rgba(0,0,0,0)), var(--tw-shadow);\n            box-shadow: var(--tw-ring-offset-shadow, 0 0 rgba(0,0,0,0)), var(--tw-ring-shadow, 0 0 rgba(0,0,0,0)), var(--tw-shadow);\n    --tw-text-opacity: 1;\n    color: rgba(107, 114, 128, var(--tw-text-opacity));\n  }\n._Button_85hye_2[data-size=\"small\"] {\n    font-size: 0.75rem;\n    line-height: 1rem;\n    padding-top: 0.5rem;\n    padding-bottom: 0.5rem;\n    padding-left: 1rem;\n    padding-right: 1rem;\n  }\n._Button_85hye_2[data-size=\"medium\"] {\n    font-size: 0.875rem;\n    line-height: 1.25rem;\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n  }\n._Button_85hye_2[data-size=\"large\"] {\n    font-size: 1rem;\n    line-height: 1.5rem;\n    padding-top: 0.75rem;\n    padding-bottom: 0.75rem;\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n  }";
let json = {"Button":"_Button_85hye_2"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}