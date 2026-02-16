import { requireAdmin } from "@/lib/admin";
import { getAllContent, getContentKeys } from "@/lib/site-content";
import { updateSiteContent } from "@/app/actions/site-content";
import { FormTextarea } from "@/components/admin/FormTextarea";
import { SubmitButton } from "@/components/admin/SubmitButton";

export default async function SiteContentPage() {
  await requireAdmin();

  const content = await getAllContent();
  const keys = getContentKeys();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Site Content</h1>
        <p className="mt-1 text-sm text-slate-400">
          Edit static text shown on the homepage and menu page. Changes appear on the live site after saving.
        </p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <form action={updateSiteContent} className="space-y-6">
          {keys.map(({ key, label }) => (
            <FormTextarea
              key={key}
              label={label}
              name={key}
              defaultValue={content[key] ?? ""}
              rows={
                key.startsWith("about_paragraph") ||
                key === "hero_tagline" ||
                key === "order_text" ||
                key === "menu_page_subtitle"
                  ? 3
                  : 2
              }
              placeholder={`Enter ${label.toLowerCase()}...`}
            />
          ))}

          <div className="flex justify-end pt-4">
            <SubmitButton>Save all content</SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}
