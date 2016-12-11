/*!
 * ----------
 * XOKB®-Data
 * ----------
 * Data of XOKB — A manually curated dedicated xanthomonas oryzae database.
 * ___________________________________________________________________________
 *
 * Grunt, http://gruntjs.com/ — The JavaScript Task Runner.
 * ___________________________________________________________________________
 *
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Prabhat Kumar [http://prabhatkumar.org/].
 * @copyright : Sequømics Research [http://research.sequomics.com/].
 * @copyright : Sequømics Corporation [http://sequomics.com/].
 * ___________________________________________________________________________
 *
 * @date      : 10-Dec-2016
 * @license   : Apache, version 2.0
 * @require   : Node.js®
 * @require   : NPM
 * @require   : grunt-contrib-clean
 * @build     : SEED™ — Örebro
 *              └────── A Sequømics Product — http://sequomics.com/.
 * ___________________________________________________________________________
 *
 * --/The Heart of Build System/-- of "XOKB®-Data".
 * ___________________________________________________________________________
 */

/*
 * Synopsis
 * --------
 * This Grunt Task is for cleaning purpose, subdivided in to the required one:
 * 1. Temporary files,
 * 2. Markdown files,
 * 3. PDB files,
 * 4. Fasta files,
 * 5. To clean build directory, and
 * 6. To prevent `release` target.
 *
 * Note: Take a precautions for [5], and
 *       for [6] set -/'no-write': false/- instead of -/'no-write': true/-
 *       to delete or clean 'src'.
 */

module.exports = {
  // 1. Before generating any new files, remove any previously-created files.
  tests: ['tmp', '.temp', '*.temp', '*.log'],
  // 2. Markdown files.
  docs: ['*.knit.md', '*.utf8.md'],
  // 3. To remove ———— *.pdb.gz, *.cif.gz, and *.sf.ent.gz
  // eg. 4XX2.pdb.gz
  pdb: ['*.pdb.gz', '*.cif.gz', '*.sf.ent.gz'],
  // 4. To remove ———— *.fasta.txt, *.fasta, and *.fa
  // eg. sequence.fasta.txt
  fasta: ['*.fasta.txt', '*.fasta', '*.fa'],
  // 5. Will delete files for `build` target.
  build: ['build'],
  // 6. Will NOT delete files for `release` target.
  release: {
    options: {
      'no-write': true
    },
    // [data] — directory contains all genomic and proteomic data.
    src: ['./data', './*.md']
  }
};
