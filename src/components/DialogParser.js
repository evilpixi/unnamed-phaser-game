export default class DialogParser {
  static parse(csvText) {
    const lines = csvText.split('\n');
    const dialog = [];

    lines.slice(1).forEach(line => {
      const [name, variant, position, ...textParts] = line.split(',');
      const text = textParts.join(',').replace(/"/g, "")
      dialog.push({ name, variant, position, text });
    });

    return dialog;
  }
}