import Link from "next/link";
//Button on the bottom right that takes us to the contact form, currently implemented in the main layout to be displayed everywhere accross the site
const FloatingBtn = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <Link href="/contact">
        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-4 shadow-lg">
          Get in Touch
        </button>
      </Link>
    </div>
  );
};
export default FloatingBtn;
