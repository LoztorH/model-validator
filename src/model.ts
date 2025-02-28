interface EnumValOpt {
  type?: "strong" | "weak";
}

interface isNumOpt {
  type?: "positive" | "negative";
  mode?: "strong" | "weak";
  isFloat?: boolean;
}

interface isString {
  max?: number;
  min?: number;
}
