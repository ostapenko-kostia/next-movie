import * as motion from "framer-motion/client";

function loading() {
  return (
    <motion.section className="w-full flex items-center justify-center mt-8 text-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      Loading...
    </motion.section>
  );
}

export default loading;
