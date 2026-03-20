export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    bgSecondary: "var(--color-bg-secondary)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    accentPrimary: "var(--color-accent-primary)",
  },
  spacing: {
    section: "clamp(3rem, 6vw, 8rem)",
  },
  radius: {
    md: "12px",
    lg: "20px",
  },
} as const;
