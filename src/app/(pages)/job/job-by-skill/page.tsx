import FormList from "@/app/components/FormList";

export const metadata = {
  title: "Jobs By Skill",
  description: "Danh sách công việc theo kỹ năng",
};

export default function JobBySkillPage() {
  return <FormList type="skill" />;
}
