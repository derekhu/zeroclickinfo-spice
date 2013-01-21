/*
  nr is the prefix for this function space.
  */
function ddg_spice_doi(bib) {

  function format_author(author) {
	if (author['family']) {
		var ret = "";
		if (author['given']) {
			ret += author['given'] + " ";
		}
		if (author['dropping-particle']) {
			ret += author['dropping-particle'] + " ";
		}
		if (author['non-dropping-particle']) {
			ret += author['non-dropping-particle'] + " ";
		}
		ret += author['family'];
		if (author['suffix']) {
			ret += " " + author['suffix'];
		}
		return ret;
	} else {
		return author['literal']
	}
  }

  function format_authors(authors) {
  	var i = 0;
	var ret = "";
  	while (authors.length - i > 3) {
		ret += format_author(authors[i]);
		ret += ", ";
		i++;
	}
  	while (authors.length - i > 1) {
		ret += format_author(authors[i]);
		ret += " and ";
		i++;
	}
	ret += format_author(authors[i]);
  	return ret;
  }

  console.log(bib);
  // validity check
  if (bib['DOI'] && bib['author'] && bib['title']) {

  	items = new Array();
  	items[0] = new Array();
	items[0]['a'] = "by " + format_authors(bib['author']);
	if (bib['issued'] && bib['issued']['raw']) {
		items[0]['a'] += ", " + bib['issued']['raw'];
	}
	items[0]['a'] += ", doi:" + bib['DOI'] + ". ";
	items[0]['a'] += "<br/>";
	items[0]['a'] += "<a href=\"http://data.datacite.org/application/x-bibtex/" + bib['DOI'] + "\">BibTeX</a> &bull; ";
	items[0]['a'] += "<a href=\"http://data.datacite.org/application/x-research-info-systems/" + bib['DOI'] + "\">RIS</a> &bull;";
	items[0]['h'] = bib['title'];
	items[0]['s'] = "dx.doi.org";
	if (bib['url']) {
		items[0]['u'] = bib["URL"];
	} else {
		items[0]['u'] = "http://dx.doi.org/" + bib['DOI'];
	}
	nra(items);
  }
}