///<reference path="../../typings/tsd.d.ts" />
///<reference path="utils.ts" />

declare var Hogan: any;

module MDwiki.Templating {
    export class Template {

        public view: string = '';
        public model: any;

        private renderedTemplate: any;

        constructor(path?: string) {
            if (path) {
                if (!path.startsWith('/'))
                    path = '/' + path;
                var elem = document.getElementById(path);
                //TODO check that elem is a script and handle errors if elem not found etc.
                this.view = $(elem).html();
            }
        }

        render () {
            // TODO allow precompiled templates
            var compiledTemplate = Hogan.compile(this.view);
            this.renderedTemplate = compiledTemplate.render(this.model);
            return this.renderedTemplate;
        }

        private assertTemplateIsReady() {
            if (!this.renderedTemplate)
                return this.render();
        }

        replace (node: any) {
            this.assertTemplateIsReady();
            return $(node).replaceWith($(this.renderedTemplate));
        }

        appendTo (node: any) {
            this.assertTemplateIsReady();
            return $(node).appendTo($(this.renderedTemplate));
        }

        insertAfter (node: any) {
            this.assertTemplateIsReady();
            return $(this.renderedTemplate).insertAfter(node);
        }
        insertBefore (node: any) {
            this.assertTemplateIsReady();
            return $(this.renderedTemplate).insertBefore(node);
        }
    }
}