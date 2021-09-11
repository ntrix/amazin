type fnType = (...args: any) => ReturnType | void;

type optFn = fnType | undefined;
interface OptionFns {
  successAction?: optFn;
  successHandler?: optFn;
  selector?: optFn;
}
