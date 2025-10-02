import FormList from "@/app/components/FormList";

export const metadata = {
  title: "Jobs By City",
  description: "Danh sách công việc theo thành phố",
};

export default function JobByCityPage() {
  return <FormList type="city" />;
}
