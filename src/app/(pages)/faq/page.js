import RenderFAQItems from "@/components/faq/renderFAQ";

export default function FAQPage() {

  return (
    <div className="bg-gray-900 pb-12">
      <div className="w-[90% mx-auto text-gray-100 bg-gray-900">
        <div>
          <RenderFAQItems />
        </div>
      </div>
    </div>
  );
}
