// Optional native example. Requires SOLIDWORKS interop references and a licensed SOLIDWORKS runtime.
using SolidWorks.Interop.sldworks;
using SolidWorks.Interop.swconst;

public sealed class CadGuardianSolidWorksAudit
{
    public void Audit(SldWorks app)
    {
        IModelDoc2 model = (IModelDoc2)app.ActiveDoc;
        IModelDocExtension extension = model.Extension;
        CustomPropertyManager properties = extension.CustomPropertyManager[""];

        properties.Get6("PartNo", false, out string value, out string resolved, out bool wasResolved, out _);

        if (model is IAssemblyDoc assembly)
        {
            object[] components = (object[])assembly.GetComponents(false);
            foreach (IComponent2 component in components)
            {
                _ = component.Name2;
            }
        }
    }
}
