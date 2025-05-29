type Props = {
  children: React.ReactNode;
  className?: string;          // <- new (optional) prop
};

export default function SectionHeader({ children, className = "" }: Props) {
  return (
    <h2
      className={
        "text-2xl font-bold mb-4 border-b-2 dark:border-indigo-500 border-rose-200 transition-colors duration-600 inline-block " +
        className
      }
    >
      {children}
    </h2>
  );
}
