import {HttpHelper} from "utils/httpHelper";

export default function (context, inject) {
  let {$axios} = context;
  let httpHelper = new HttpHelper($axios);
  context.$httpHelper = httpHelper;

  inject("httpHelper", httpHelper);
}
