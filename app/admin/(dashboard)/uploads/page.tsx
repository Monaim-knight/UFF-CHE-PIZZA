import { requireAdmin } from "@/lib/admin";
import { UploadImageBlock } from "@/components/admin/UploadImageBlock";
import Link from "next/link";

export default async function UploadsPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-50">Upload images</h1>
        <p className="mt-1 text-sm text-slate-400">
          Upload pizza or dish photos here. After uploading, copy the image URL
          and paste it in the menu item’s <strong>Image URL</strong> field when
          editing an item.
        </p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-4 text-lg font-medium text-slate-200">
          Upload a new image
        </h2>
        <p className="mb-4 text-sm text-slate-400">
          Click the button below, choose an image (max 10MB), and wait for the
          upload to finish. The image URL will appear; copy it and use it in{" "}
          <Link
            href="/admin/items"
            className="text-brand-400 hover:text-brand-300"
          >
            Menu Items → Edit
          </Link>{" "}
          in the <strong>Image URL</strong> field.
        </p>
        <UploadImageBlock />
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="mb-2 text-lg font-medium text-slate-200">
          Where to use the image
        </h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-400">
          <li>Upload an image above and copy the URL (or note it).</li>
          <li>
            Go to{" "}
            <Link href="/admin/items" className="text-brand-400 hover:underline">
              Menu Items
            </Link>
            .
          </li>
          <li>Click <strong>Edit</strong> on the pizza or dish.</li>
          <li>Paste the URL into the <strong>Image URL</strong> field.</li>
          <li>Click <strong>Update Item</strong>.</li>
        </ol>
      </div>
    </div>
  );
}
