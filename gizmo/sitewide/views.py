from django.shortcuts import render
from django.views.generic import DetailView, TemplateView

# class ProjectDetailView(MobileFullMixin, DetailView):
#     model = Context
#     # context_object_name = 'object'
#     # template_name = 'supporting/person_detail.html'

class ProjectDetailView(TemplateView):
    """
    used but about as well, both slim and full versions
    """
    # default template for slim -- full url will override
    template_name = "projects/project_slim.html"
    # extend_base - default from FeatureDetailView, or override in sub class
    
    # put the page name into the context 
    def get_context_data(self, **kwargs):
        # get contect
        context = super(ProjectDetailView, self).get_context_data(**kwargs)
        # get the short name
        # print(" -- **kwargs: " + kwargs['slug'])
        # e.g. page = "impressions"
        page = kwargs['slug']
        # determine within site (back) vs. from outside (home)
        try:
            # record referring path for full-screen back link
            split_path = self.request.META['HTTP_REFERER'].split("/")
            # e.g http://digitalgizmo.com/products/impressions/
            # key:   0/1/   2            /   3   /       4    /5
            referring_path = "/".join(["", split_path[3]]) # e.g. /project

            print(" --- referrer: " + self.request.META['HTTP_REFERER'])
            # print(" --- split_path length: " + str(len(split_path)))
            # print(" -- referring_path: " + referring_path)
            # print(" -- split_path[2]: " + split_path[2]+ " 3: " + split_path[3]+ " 4: " + split_path[4])

            # space after last / counts (also we're in non-index mode of counting re: length)

            # if len(split_path) > 6:
            #     # "/".join([split_path[5], ""])
            #     referring_path += split_path[5] + "/"
            #     # not sure if we ever get here, but just in case
            #     if len(split_path) > 7:
            #         referring_path += split_path[6] + "/"

        except KeyError:
            referring_path = "/"

        print(" -- referring_path: " + referring_path)



        
        # add variables to context
        context.update({'page': page, 'referring_path': referring_path })
        return context
