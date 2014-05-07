var RollOverMarker = L.Marker.extend({
    bindPopup: function(htmlContent, options) {
        if (options && options.showOnMouseOver) {
            L.Marker.prototype.bindPopup.apply(this, [htmlContent, options]);

            this.off("click", this.openPopup, this);

            this.on("mouseover", function(e) {
                var target = e.originalEvent.fromElement || e.originalEvent.relatedTarget;
                var parent = this._getParent(target, "leaflet-popup");
                if (parent == this._popup._container)
                    return true;
                this.openPopup();
            }, this);

            this.on("mouseout", function(e) {
                var target = e.originalEvent.toElement || e.originalEvent.relatedTarget;
                if (this._getParent(target, "leaflet-popup")) {
                    L.DomEvent.on(this._popup._container, "mouseout", this._popupMouseOut, this);
                    return true;
                }
                this.closePopup();
            }, this);
        }
    },

    _popupMouseOut: function(e) {

        L.DomEvent.off(this._popup, "mouseout", this._popupMouseOut, this);
        var target = e.toElement || e.relatedTarget;
        if (this._getParent(target, "leaflet-popup"))
            return true;
        if (target == this._icon)
            return true;
        this.closePopup();
    },

    _getParent: function(element, className) {

        var parent = element.parentNode;
        while (parent != null) {
            if (parent.className && L.DomUtil.hasClass(parent, className))
                return parent;
            parent = parent.parentNode;
        }
        return false;
    }
});
