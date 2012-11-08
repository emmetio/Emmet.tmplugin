// override `replaceContent()` method of editor proxy
// to provide desired output for back-end app
objcEmmetEditor.replaceContent = function(value, start, end, noIndent) {
	var content = this.getContent();
	var caretPos = this.getCaretPos();

	if (_.isUndefined(end)) 
		end = _.isUndefined(start) ? content.length : start;
	if (_.isUndefined(start)) start = 0;
	
	value = tmUpdateTabStops(value);
	this.getContext().replaceContentWithValue_from_to_withoutIndentation(value, start, end, !!noIndent);
};

function tmUpdateTabStops(value) {
	var base = 1000;
	var zeroBase = 0;
	return emmet.require('tabStops').processText(value, {
		tabstop: function(data) {
			var group = parseInt(data.group, 10);
			if (group === 0)
				group = ++zeroBase;
			else
				group += base;

			return '${' + group + (data.placeholder ? ':' + data.placeholder : '') + '}';
		}
	})
}