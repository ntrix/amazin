type FnType = (...args: any) => ReturnType | void;

type OptFn = FnType | undefined;
type OptionFns = {} & {
  successAction?: OptFn;
  successHandler?: OptFn;
  selector?: OptFn;
};

type Status = {
  loading?: boolean;
  error?: boolean;
  success?: boolean;
};