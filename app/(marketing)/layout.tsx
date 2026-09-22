import { MarketingNavbar } from "@/components/marketing/marketingNavbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingNavbar />
      {children}
    </>
  );
}
