import _ from "lodash";

const functions = {
  convertToTitle: (text) => {
    return _(text)
      .replace("-", " ")
      .replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
  },
};

export default functions;
